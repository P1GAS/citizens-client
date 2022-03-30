import { useEffect, useState } from "react";

import { getCitizens, updateCitizenData, getCityData } from "servers";

import App from "components/app";
import Loader from "components/loader";

const AppContainer = () => {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        const res = await getCitizens();
        const { citizens } = res.data;
        setCitizens(citizens);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert("Ошибка в консоли");
      }
    };

    fetchCitizens();
  }, []);

  const setEditIdHandler = (id) => {
    if (id === editId) {
      return setEditId("");
    }

    setEditId(id);
  };

  const updateCitizenDataHandler = async (id, type, name) => {
    if (!name && name !== null) {
      return alert("Имя не должно быть пустым");
    }

    try {
      const res = await updateCitizenData(id, { type, name: name || "" });
      const { citizen: updatedCitizen } = res.data;

      console.log("updatedCitizen", updatedCitizen);

      setCitizens((prevCitizens) => {
        const citizens = JSON.parse(JSON.stringify(prevCitizens));

        const citizen = citizens.find(
          (citizen) => citizen._id === updatedCitizen._id
        );

        citizen.groups = updatedCitizen.groups;

        return citizens;
      });
    } catch (error) {
      console.log(error);
      alert("Ошибка в консоли");
    }
  };

  if (loading) return <Loader />;
  return (
    <App
      citizens={citizens}
      editId={editId}
      setEditIdHandler={setEditIdHandler}
      updateCitizenDataHandler={updateCitizenDataHandler}
    />
  );
};

export default AppContainer;
