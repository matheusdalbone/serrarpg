/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FaAnglesDown } from "react-icons/fa6";
import { getAllById } from "../../services/DndApi/api";

const Card = ({ title, cardType, firstLine, secondLine, thirdLine }) => {
  // const[features, setFeatures] = useState({});
  let features = {};
  const [firstStats, setFirstStats] = useState('');
  const [secondStats, setSecondStats] = useState('');
  const [thirdStats, setThirdStats] = useState('');

  async function getAllId() {
    const results = await getAllById(title.url);
    // setFeatures(results.data);
    features = results.data;

    switch (cardType) {
      case "spells":
        setFirstStats(JSON.stringify(features.level))
        setSecondStats(features.desc)
        setThirdStats(JSON.stringify(features.school.name));
        break

      case "features":
        setFirstStats(JSON.stringify(features.class.name))
        setSecondStats(JSON.stringify(features.level))
        setThirdStats(features.desc)
        break

      case "weapon":
        setFirstStats(JSON.stringify(features.weapon_range))
        setSecondStats(JSON.stringify(features.damage.damage_dice))
        setThirdStats(JSON.stringify(features.weight))
        break

      case "armor":
        setFirstStats(JSON.stringify(features.armor_category))
        setSecondStats(JSON.stringify(features.armor_class.base))
        setThirdStats(JSON.stringify(features.weight))
        break

      case "magic":
        setFirstStats(JSON.stringify(features.equipment_category.name))
        setSecondStats(JSON.stringify(features.rarity.name))
        setThirdStats(features.desc)
        break

      case "rule":
        setFirstStats(features.desc)
        setSecondStats()
        setThirdStats()
        break
    }
  }

  //console.log(title)

  useEffect(() => {
    getAllId()
  }, [firstLine])

  return <div className={styles.geral}>
    <button className={styles.card}>
      <div className={styles.labelDiv}>
        <label>{title.name}</label>
      </div>
      <div className={styles.anglesDiv}>
        <FaAnglesDown></FaAnglesDown>
      </div>
    </button>
    <div className={styles.description}>
      <ul>
        <li>
          {firstLine} {firstStats}
        </li>
        <li>
          {secondLine} {secondStats}
        </li>
        <li>
          {thirdLine} {thirdStats}
        </li>
      </ul>
    </div>
  </div>
}

export default Card;