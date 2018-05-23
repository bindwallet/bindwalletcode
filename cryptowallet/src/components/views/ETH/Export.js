import React, { Component } from 'react'
import { createObserver, collect } from 'dop'
import styled from 'styled-components'
import { Show } from '/router/components'

// import { createWorker } from '/api/workers'
import { generateQRCode } from '/api/qr'
import { ETH } from '/api/coins'
import { getPublicFromPrivateKey } from '/api/coins/ETH'
import { printTemplate, downloadFile } from '/api/browser'
import { encryptAES128CTR } from '/api/crypto'

import state from '/store/state'
import { getAsset, isAssetWithSeed, decrypt } from '/store/getters'

import routes from '/router/routes'
import styles from '/const/styles'

import Div from '/components/styled/Div'
import Button from '/components/styled/Button'
import Input from '/components/styled/Input'
import Select from '/components/styled/Select'
import CenterElement from '/components/styled/CenterElement'
import {
    FormField,
    FormFieldLeft,
    FormFieldRight,
    FormFieldButtons
} from '/components/styled/Form'
import { Label, SubLabel } from '/components/styled/Label'

import { PrivateKey as template, Words as template2 } from '/const/paperwallets'

const TYPES_EXPORTS = {
    seed: 'seed',
    privatekey: 'privatekey',
    keystore: 'keystore'
}

export default class ExportETH extends Component {
    componentWillMount() {
        this.observer = createObserver(m => this.forceUpdate())
        this.observer.observe(state.view)

        this.asset_id = state.location.path[1]
        this.is_asset_with_seed = isAssetWithSeed(this.asset_id)

        // Initial state
        state.view = {
            type_export: this.is_asset_with_seed
                ? TYPES_EXPORTS.seed
                : TYPES_EXPORTS.privatekey,
            password: '',
            invalid_password: false
        }

        // binding
        this.onChangeTypeExport = this.onChangeTypeExport.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onExport = this.onExport.bind(this)
    }
    componentWillUnmount() {
        this.observer.destroy()
    }
    shouldComponentUpdate() {
        return false
    }

    onChangeTypeExport(e) {
        state.view.type_export = e.target.value
    }

    onChangePassword(e) {
        const collector = collect()
        state.view.password = e.target.value
        state.view.invalid_password = false
        collector.emit()
    }
    onExport(e) {
        e.preventDefault()
        const type_export = state.view.type_export
        const asset_id = state.location.path[1]
        const asset = getAsset(asset_id)
        const address = asset.address
        const password = state.view.password
        let private_key_encrypted

        // Keystore
        if (type_export === TYPES_EXPORTS.keystore) {
            if (this.is_asset_with_seed) {
                const { private_key } = decrypt(asset_id, password)
                if (private_key) {
                    private_key_encrypted = encryptAES128CTR(
                        private_key,
                        password,
                        true,
                        true
                    )
                } else {
                    state.view.invalid_password = true
                    return
                }
            } else {
                private_key_encrypted = asset.private_key
            }

            const fileString = JSON.stringify({
                version: 3,
                id: address,
                address: address,
                Crypto: private_key_encrypted
            })
            const name =
                'UTC--' +
                new Date().toJSON().replace(/:/g, '-') +
                '--' +
                address
            downloadFile({ data: fileString, name })

            // Seed & Privatekey
        } else {
            const { private_key, seed } = decrypt(asset_id, password)

            if (private_key) {
                if (type_export === TYPES_EXPORTS.seed) {
                    printTemplate(template2(seed))
                } else {
                    const public_key = getPublicFromPrivateKey(private_key)
                    const qrs = [
                        {
                            img: generateQRCode(address),
                            hash: address,
                            title: 'Address',
                            description:
                                'You can share this address to receive funds.'
                        },
                        {
                            img: generateQRCode(
                                private_key,
                                undefined,
                                styles.color.red3
                            ),
                            hash: private_key,
                            red: true,
                            title: 'Private Key',
                            description:
                                'This CAN NOT BE SHARED. If you share this you will lose your funds.'
                        },
                        {
                            title: `Public Key`,
                            hash: public_key
                        }
                    ]
                    printTemplate(template(qrs))
                }
            } else {
                state.view.invalid_password = true
            }
        }
    }
    render() {
        return React.createElement(ExportETHTemplate, {
            type_export: state.view.type_export,
            is_asset_with_seed: this.is_asset_with_seed,
            password: state.view.password,
            invalid_password: state.view.invalid_password,
            onChangeTypeExport: this.onChangeTypeExport,
            onChangePassword: this.onChangePassword,
            onExport: this.onExport
        })
    }
}

function ExportETHTemplate({
    type_export,
    is_asset_with_seed,
    password,
    invalid_password,
    onChangeTypeExport,
    onChangePassword,
    onExport
}) {
    return (
        <Div>
            <form>
                <FormField>
                    <FormFieldLeft>
                        <Label>Format</Label>
                        <Show if={type_export === TYPES_EXPORTS.keystore}>
                            <SubLabel>
                                You have to remember your current password in
                                order to import this asset in the future.
                            </SubLabel>
                        </Show>
                    </FormFieldLeft>
                    <FormFieldRight>
                        <Select width="100%" onChange={onChangeTypeExport}>
                            <option
                                disabled={!is_asset_with_seed}
                                value={TYPES_EXPORTS.seed}
                                selected={type_export === TYPES_EXPORTS.seed}
                            >
                                Recovery Phrase (12 words)
                            </option>

                            <option
                                value={TYPES_EXPORTS.privatekey}
                                selected={
                                    type_export === TYPES_EXPORTS.privatekey
                                }
                            >
                                Private Key
                            </option>
                           
                        </Select>
                    </FormFieldRight>
                </FormField>

                <Show
                    if={
                        is_asset_with_seed ||
                        type_export !== TYPES_EXPORTS.keystore
                    }
                >
                    <FormField>
                        <FormFieldLeft>
                            <Label>Password</Label>
                            <SubLabel>Password of this wallet.</SubLabel>
                        </FormFieldLeft>
                        <FormFieldRight>
                            <Input
                                width="100%"
                                value={password}
                                onChange={onChangePassword}
                                type="password"
                                error={'Invalid password'}
                                invalid={invalid_password}
                            />
                        </FormFieldRight>
                    </FormField>
                </Show>

                <FormField>
                    <FormFieldButtons>
                        <Button onClick={onExport}>
                            {type_export === TYPES_EXPORTS.keystore
                                ? 'Download'
                                : 'Unlock and Print'}
                        </Button>
                    </FormFieldButtons>
                </FormField>
            </form>
        </Div>
    )
}
