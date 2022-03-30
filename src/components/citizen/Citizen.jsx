import { useEffect, useState } from "react";
import "./citizen.css";

const groupTypeValue = {
  country: "Страна",
  city: "Город",
  district: "Район",
  street: "Улица",
  house: "Дом",
};

const GroupItem = ({ name, remove, type }) => {
  return (
    <div className="card__content">
      <p className="card__text">
        <span className="card__text-primary">{groupTypeValue[type]}: </span>
        {name}
      </p>
      <button className="btn" onClick={() => remove(type)}>
        удалить
      </button>
    </div>
  );
};

const Citizen = ({
  citizen,
  setEditIdHandler,
  updateCitizenDataHandler,
  editId,
}) => {
  const [groups, setGroups] = useState({});
  const [groupType, setGroupType] = useState("country");
  const [groupName, setGroupName] = useState("");

  const update = (e) => {
    e.preventDefault();
    updateCitizenDataHandler(citizen._id, groupType, groupName);
  };

  const remove = (type) => {
    updateCitizenDataHandler(citizen._id, type, null);
  };

  useEffect(() => {
    const reducedGroups = citizen.groups.reduce((acc, current) => {
      acc[current.$type] = current.name;
      return acc;
    }, {});

    setGroups(reducedGroups);
  }, [citizen]);

  return (
    <div className="cards__container">
      <div className="card__container">
        {groups.country && (
          <GroupItem name={groups.country} type="country" remove={remove} />
        )}
        {groups.city && (
          <GroupItem name={groups.city} type="city" remove={remove} />
        )}
        {groups.district && (
          <GroupItem name={groups.district} type="district" remove={remove} />
        )}
        {groups.street && (
          <GroupItem name={groups.street} type="street" remove={remove} />
        )}
        {groups.house && (
          <GroupItem name={groups.house} type="house" remove={remove} />
        )}

        <p className="card__text card__bottom">
          <span className="card__text-primary">Имя: </span>
          {citizen.name}
        </p>

        <button className="btn" onClick={() => setEditIdHandler(citizen._id)}>
          обновить
        </button>
      </div>

      {editId === citizen._id && (
        <form className="card__form">
          <select
            name="place"
            onChange={(e) => setGroupType(e.target.value)}
            value={groupType}
          >
            <option value="country">страна</option>
            <option value="city">город</option>
            <option value="district">район</option>
            <option value="street">улица</option>
            <option value="house">дом</option>
          </select>
          <input
            type="text"
            placeholder="новое имя"
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
          <button className="btn" type="submit" onClick={update}>
            отправить
          </button>
        </form>
      )}
    </div>
  );
};

export default Citizen;
