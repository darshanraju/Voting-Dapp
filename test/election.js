var Election = artifacts.require("../contracts/Election.sol");

contract("Election", async (accounts) => {
  it("initializes with three candidates", async () => {
    const instance = await Election.deployed();

    const candidatesCount = await instance.candidatesCount();
    assert.equal(candidatesCount, 2);
  });

  it("Initializes candidates with correct values", async () => {
    const instance = await Election.deployed();

    let candidate = await instance.candidates(1);
    assert.equal(candidate[0], 1);
    assert.equal(candidate[1], "Candidate 1");
    assert.equal(candidate[2], 0);

    candidate = await instance.candidates(2);
    assert.equal(candidate[0], 2);
    assert.equal(candidate[1], "Candidate 2");
    assert.equal(candidate[2], 0);
  });

  it("can cast a vote", async () => {
    const instance = await Election.deployed();

    await instance.vote(1, { from: accounts[0] });
    const voted = await instance.voters(accounts[0]);

    //Checking if the boolean in the mapping is true, meaning they voted
    assert(voted, "The voted was marked as voted");
    const candidate = await instance.candidates(1);
    const voteCount = candidate[2];
    assert.equal(voteCount, 1);
  });

  it("throws an exception for invalid candidates", async () => {
    const electionInstance = await Election.deployed();

    electionInstance
      .vote(99, { from: accounts[1] })
      .then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
      });

    const candidate1 = await electionInstance.candidates(1);
    var voteCount = candidate1[2];
    assert.equal(voteCount, 1);

    const candidate2 = await electionInstance.candidates(2);
    var voteCount = candidate2[2];
    assert.equal(voteCount, 0);
  });

  it("throws an exception for voting twice", async () => {
    const electionInstance = await Election.deployed();

    await electionInstance.vote(1, { from: accounts[3] });
    const voted = await electionInstance.voters(accounts[0]);
    assert(voted, "The voted was marked as voted");

    electionInstance
      .vote(1, { from: accounts[3] })
      .then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
      });
  });
});
