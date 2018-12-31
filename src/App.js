import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getWeb3 from './getWeb3';

const ipfsAPI = require("ipfs-api");
const ipfs = ipfsAPI({host: "localhost", port: "5001", protocol: "http"});
//const Web3 = require("web3");
//const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.etherscan.io/tx"));

function Utf8ArrayToStr(array) {
    var out,
        i,
        len,
        c;
    var char2,
        char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
            default:
                break;
        }
    }

    return out;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            strHash: null,
            strContent: null
        }
    }

    saveTextBlobOnIpfs = (blob) => {
        return new Promise(function(resolve, reject) {
            const descBuffer = Buffer.from(blob, 'utf-8');
            ipfs.add(descBuffer).then((response) => {
                console.log(response);
                resolve(response[0].hash);
            }).catch((err) => {
                console.error(err);
                reject(err);
            })
        })
    };

/*    componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
*/
    getContract = async() => {
        console.log("start get web3");
        const web3 = await getWeb3();
        console.log("get web3");
        const accounts = await web3.eth.getAccounts();
        if (typeof web3 !== 'undefined') {
            var sysuconmunityContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_fileId","type":"uint256"}],"name":"downloadById","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFileList","outputs":[{"name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"registerUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fileHash","type":"uint256"},{"name":"_name","type":"string"}],"name":"upload","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"account","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"downloadByName","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_coinNum","type":"uint256"}],"name":"coinTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"fileToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"files","outputs":[{"name":"name","type":"string"},{"name":"hash","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]);
            var address = "0x76dd0f1b784a2611d1a90926243497971b6a76bc";
            var sysuconmunity = sysuconmunityContract.at(address);
            return sysuconmunity;

        } else {
            alert("No currentProvider for web3");
        }
    
        return null;   
    };

/*    getContract = () => {
        return new Promise(function(resolve, reject) {
            getWeb3().then((web3) => {
                console.log("get in test2");
                var sysuconmunityContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_fileId","type":"uint256"}],"name":"downloadById","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFileList","outputs":[{"name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"registerUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fileHash","type":"uint256"},{"name":"_name","type":"string"}],"name":"upload","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"account","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"downloadByName","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_coinNum","type":"uint256"}],"name":"coinTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"fileToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"files","outputs":[{"name":"name","type":"string"},{"name":"hash","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]);
                var address = "0x76dd0f1b784a2611d1a90926243497971b6a76bc";
                var sysuconmunity = sysuconmunityContract.at(address);
                resolve(sysuconmunity);
            }).catch((err) => {
                console.error(err);
                reject(err);
            })
        })
    }
*/
    render() {
        return (
            <div className="App">

                <div id="App-left">
                    <div id="left-top">SYSU<br/>Community</div>
                    <div id="left-bottom">
                        <div className="left-item">文件</div>
                        <div className="left-item">交易</div>
                        <div className="left-item selected">账户</div>
                    </div>
                </div>

                <div id="App-right">
                    <input className="input-text"/><br/>
                    <button id="upload-btn" className="button">upload</button>
                    <div className="file-item">
                        <img className="file-img" src={require('./file.svg')} alt="sysu-conmunity" />
                        <div className="file-name">new.txt</div>
                        <div className="file-size">1KB</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
