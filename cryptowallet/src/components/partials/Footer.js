import React, { Component } from 'react'
import styled from 'styled-components'
import styles from '/const/styles'
import { version, repository } from './../../../package.json'

export default function Footer() {
    return (
        <FooterDiv>
            <div>
				<ul>
				    <li>
					  <a
                            href="https://github.com/bindwallet/bindwalletcode"
                            target="_blank"
                        >
                            source code
                        </a>
                        
                    </li>
                    <li>
					    
                        <a href="mailto:contact@bindwallet.com">support</a>
                    </li>
					<li>
					  <a
                            href="https://github.com/elevenyellow/coinfy"
                            target="_blank"
                        >
                            fork of coinfy.com
                        </a>
                        
                    </li>
                    
                </ul>
            </div>
        </FooterDiv>
    )
}

const FooterDiv = styled.div`
    /* height: ${styles.paddingOut}; */
    padding: 0 ${styles.paddingOut};
    ${styles.media.second} {
        div {
            display: none;
        }
    }
    div {
        padding-top: 15px;
    }
    ul {
        list-style: none;
        margin: 0;
    padding: 0;
    text-align: right;
    }
    li {
        display: inline-block;
    margin-left: 10px;
}
    }
    a {
        font-size: 12px;
        color: #000;
        font-weight: bold;
        letter-spacing: 0.2px;
        display: block;
        padding-right: 10px;
        text-align: right;
        opacity: 0.35;
    }
    a:hover {
        opacity: 0.5;
    }

`
