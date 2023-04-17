import axios from "axios";
const url = "http://localhost:3000";

export const UpgradeUser = async (upgrade) => {
    console.log("test" + upgrade); 
    try {
        await axios.post(`http://localhost:3000/user/upgrade`, upgrade);
    } catch (error) {
        console.log(error); 
    }
    //return console.log(upgrade); 
};

export const showAssociations = async () => {
    try {
        console.log("test first");
        await axios.get(`http://localhost:3000/user/getAllAssociations`).then((res) => { return res });
    } catch (error) {
        console.log(error);
    }
}
    
    
export const getOneAssociation = async () => {
    try {
        console.log("test first"); 
        await axios
          .get(
            `http://localhost:3000/association/getOneAssociation/641c71da77dc478d1afdc1c6`
          )
          .then((res) => {
            return res;
          });
  } catch (error) {
        console.log(error);
  } 
}



export const addDonation = async (donation) => { 
  try {
    await axios.post(`http://localhost:3000/donation/addDonation`, donation);
  } catch (error) {
    console.log(error);
  } 
};


export const getAssociationByUser = async (id) => {
  try { 
    await axios
      .get(`http://localhost:3000/association/getAssociationByUser/${id}`)
      .then((res) => { 
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};


export const editAssociation = async (id,association) => {
  try {
    await axios
      .put(`http://localhost:3000/association/editAssociation/${id}`, association);
  } catch (error) {
    console.log(error);
  }
};

export const addFunding = async (funding) => {
  try {
    await axios.post(`http://localhost:3000/funding/addFunding`, funding);
  } catch (error) {
    console.log(error);
  } 
};

export const editFunding = async (id, funding) => {
  try {
    await axios.put(`http://localhost:3000/funding/editFunding/${id}`, funding);
  } catch (error) {
    console.log(error);
  }
};


export const getRanking = async () => {
  try {
    await axios
      .get(`http://localhost:3000/donation/getRanking`)
      .then((res) => {
        console.log(res.data);
        return res.data ;

      });
  } catch (error) {
    console.log(error);
  }
};


export const getUpgrades = async () => {
  try {
    await axios.get(`http://localhost:3000/user/AllUpgrades`).then((res) => {
      console.log(res.data);
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};


export const addAssociation = async (association) => {
  try {
    await axios.post(
      `http://localhost:3000/association/upgradeToAssociation`,
      association
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteUpg = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/user/deleteUpgrade/${id}`);
  } catch (error) {
    console.log(error);
  }
};
