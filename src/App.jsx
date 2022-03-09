import styles from './style.module.scss'

import React, { useEffect, useState } from 'react'

function PopUp({ setlist, closePopUp, color }) {

  const [form, setform] = useState({ color: color, title: "", desc: "" })

  const formHandler = (e) => {
    setform((f) => {
      f[e.target.name] = e.target.value;
      return { ...form };
    })
  }

  console.log(form)

  return (
    <div className={styles.popUp}>
      <input name='title' type="text" placeholder='Add to-do title' onChange={(e) => { formHandler(e) }} />
      <textarea name='desc' placeholder='Add to-do description' onChange={(e) => { formHandler(e) }} id="" cols="30" rows="10"></textarea>
      <span className={styles.controls}>
        <p onClick={() => { closePopUp() }} >Cancel</p>
        <button onClick={() => {
          setlist((list) => {
            list.push(form);
            return [...list]
          })

          closePopUp();
        }}>Add to-do</button>
      </span>
    </div>
  )
}

function SideNav({ openPopUp, selectedCol, setselectedCol }) {
  return (
    <div className={styles.sideNav}>
      <button className={styles.roundbtn} onClick={() => { (openPopUp()) }}>
        +
      </button>

      <ul>
        {
          ['#FEC971', '#FE9B72', '#B593FD', '#00D5FD', '#E3EF8F'].map((col, i) => {
            return <li
              className={(i == selectedCol) ? styles.selected : ''}
              style={{ background: col }}
              onClick={() => { setselectedCol(i) }}
            >
            </li>
          })
        }
      </ul>

    </div>
  )
}


function Card({ data }) {
  return (
    <div
      style={{ background: data.color }}
      className={styles.card}>
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
    </div>
  )
}


function App() {

  const [popVisible, setpopVisible] = useState(false);
  const [selectedCol, setselectedCol] = useState(0);
  const colorList = ['#FEC971', '#FE9B72', '#B593FD', '#00D5FD', '#E3EF8F'];

  const [list, setlist] = useState([{ color: '#FEC971', title: "Google Fonts is a web font", desc: " service owned by Google. This includes free and open source font families, an interactive web directory for browsing the library, and APIs for using the fonts via CSS and Android." }])

  console.log(list);

  return (
    <div className={styles.outterCon}>
      <div className={styles.innerCon}>
        <SideNav openPopUp={() => { setpopVisible(true) }} selectedCol={selectedCol} setselectedCol={setselectedCol} />
        {popVisible ? <PopUp color={colorList[selectedCol]} setlist={setlist} closePopUp={() => { setpopVisible(false) }} /> : null}
        <div className={styles.cardCon}>
          {
            list.map((ele, i) => {
              return <Card data={ele} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
