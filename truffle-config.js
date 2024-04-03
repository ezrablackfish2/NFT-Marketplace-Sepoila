require("babel-register");
require("babel-polyfill");

module.exports = {
	contracts_directory: "./contracts/",
  	contracts_build_directory: "./public/contracts",  

  networks: { 
    development: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "*",       
     },
  },

  

  compilers: {
    solc: {
      version: "0.5.0",
      optimizer: {
	enabled: true,
	runs: 200
}
      
    }
	
  },
  };
