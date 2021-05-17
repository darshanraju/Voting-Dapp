// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
contract Election {
    //Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Store candidate
    //Fetch Candidate
    mapping(uint => Candidate) public candidates;

    //Store voters
    mapping(address => bool) public voters;

    //Store Candidates Count
    uint public candidatesCount;

    //Read candidate, setting the state variable public automatically 
    //created a getter for it (e.g. app.candidate() gives 'Candidate 1')

    string public candidate;

    //Constructor
    constructor () {
        //State variable
        //Add the addCandidate function inside the constructor, so it runs whenever the contracted is
        //migrated or deployed

        //This smart contract will be in charge of knowing how many candidates exist in the Election 
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");

    }

    //the underscore (_) means this is a local variable, not a state variable
    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }   

    function vote (uint _candidateId) public {
        //Check for valid scenario
        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId < candidatesCount);
        //msg is meta data about who sent the vote

        //NOTE: ANY CODE BELOW THIS THAT ISN"T REACHED DUE TO FAILURES OF THE REQUIRES, THE GAS WILL BE REFUNDED
        //      ANY CODE ABOVE THAT HITS THE REQUIRES AND FAILS WILL NOT BE REFUNDED, AS THAT CODE WAS EXECUTED

        //record that voter has added
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount ++;
    }
}

/**
    Storage Types: memory, calldata, storage
 */