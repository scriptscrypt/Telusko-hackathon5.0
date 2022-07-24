let accounts;

const libcAddress = "0xbA83970859787bD529f9bEacBb1000b8Ba06Cb71"
const libcABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]


const provider = new ethers.providers.Web3Provider(window.ethereum);
console.log(`Provider - ${provider}`);

window.onload = function (){
    console.log("Dapp loaded ")
        if(window.ethereum){
            this.ethereum.on('accountsChanged', handleAccountChanged)

            window.ethereum.request({method: 'eth_accounts'})
            .then(handleAccountChanged)
            .catch((err) =>{
                console.log(err)
            })   
        }
        else{
            console.log("Please install a digital wallet")
        }     

}
const handleAccountChanged = (a) =>{
    accounts = a;
    console.log("Account changed");
    console.log(a)
}

  const  enableEth = async () => {
    try{
    accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    
    }
    catch(err){
        console.log(err.code);
    }

    console.log(accounts);
    console.log(`Account - ${accounts}`);
}


const checkEthBalance = async () => {
    let balance;
    try{
    balance = await window.ethereum.request({method: 'eth_getBalance', params: [accounts[0], "latest"] 

})  
    }
    catch(err){
        console.log(err)
    }

    console.log(balance)
    console.log(`Parsed Ethereum balance - ${parseInt(balance)/(Math.pow(10, 18))}`);

}

const sendTransaction = () =>{
    try {
        let params = [
            {
                from: accounts[0],
                to: '0x1377054388861799E3A2c4588f604f9C06088801',
                gas:Number(21000).toString(16),
                gasPrice: Number(2500000).toString(16),
                value:Number(500000000000000).toString(16)
            }
        ]
        const sendMoney = window.ethereum.request({method:'eth_sendTransaction', params})

    } catch (error) {
        console.log(error)
    }
}

const checkTokenBalance = async () =>{
    let libcContract = new ethers.Contract(libcAddress, libcABI, provider);

    const balance = await libcContract.balanceOf(accounts[0]);

    console.log(balance.toString());
}

const transferToken = async () =>{
    let libcContract = new ethers.Contract(libcAddress, libcABI, provider.getSigner())

    const amount = ethers.utils.parseUnits("0.01", 18)
    console.log(parseInt(amount)/Math.pow(10,18))

    let tx = await libcContract.transfer("0x1377054388861799E3A2c4588f604f9C06088801", amount);

    checkEvents();
} 

const checkEvents = async () =>{
    let libcContract = new ethers.Contract(libcAddress, libcABI, provider)

    libcContract.on("Transfer", (from, to, amount) => {
            console.log("Got the event - Transfer");
            console.log(from, to, amount.toString());
    })
}

const simpleSignature = async () =>{
    let signer = provider.getSigner();
    let message = "This is the message inside of Simple signature";

    let signature = await signer.signMessage(message);
    let address = ethers.utils.verifyMessage(message, signature)
    console.log(`Signature - ${signature}`);
    console.log(`Address - ${address}, Account - ${accounts[0]}`)

    if(address.toUpperCase() === accounts[0].toUpperCase()){
        console.log("You are verified!")
    }
    else{
            console.log("This is not your address ")
        }
    
   
}