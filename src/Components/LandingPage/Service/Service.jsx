import React from 'react'
import './Service.css'
// import img from '../../Assets/3695101d-47c9-4438-a553-6e3bf80daf9c.jpeg.png'

const Service = () => {
  return (
    <div className='service'>
        <div className="sub-service">
            <div className="img-div">
                <img src='https://metro.co.uk/wp-content/uploads/2018/04/sei_6133981.jpg?quality=90&strip=all&zoom=1&resize=768%2C558' alt="anim" />
            </div>
            <div className="list">
                <div className="cards">
                    <div className="num">
                        1
                    </div>
                    <div className="text">
                        <h3>Health and Medical Records</h3>
                        <p>Maintain health records, vaccinations, treatments, and medical history for each animal. </p>
                    </div>
                </div>
                <div className="cards">
                    <div className="num">
                        2
                    </div>
                    <div className="text">
                        <h3>Growth and Performance Monitoring</h3>
                        <p>Keep track of weight gains, growth rates, and other performance indicators for individual animals or the entire herd. </p>
                    </div>
                </div>
                <div className="cards">
                    <div className="num">
                        3
                    </div>
                    <div className="text">
                        <h3>Feed and Nutrition Management</h3>
                        <p>Create balanced diets and feeding plans based on nutritional requirements. </p>
                    </div>
                </div>
                <div className="cards">
                    <div className="num">
                        4
                    </div>
                    <div className="text">
                        <h3>Livestock Marketing and Sales</h3>
                        <p>Monitor market trends and assess the value of individual animals or the herd. </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Service
