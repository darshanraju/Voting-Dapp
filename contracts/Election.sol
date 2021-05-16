// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
contract Election {

    //Store candidate

    //Read candidate, setting the state variable public automatically created a getter for it (e.g. app.candidate() gives 'Candidate 1')
    string public candidate;

    //Constructor
    constructor () {
        //State variable
        candidate = "Candidate 1";
    }
}