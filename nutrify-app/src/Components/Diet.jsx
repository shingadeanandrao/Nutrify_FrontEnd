import React, { useContext, useEffect, useState } from 'react';
import userContext from './../Context/UserContext';
import Header from './Header';

const Diet = () => {
  let loggedData = useContext(userContext);

  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());

  const [total, setTotal] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalFiber: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/track/${loggedData.loggedUser.userId}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${loggedData.loggedUser.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, [date, loggedData.loggedUser.userId, loggedData.loggedUser.token]);

  useEffect(() => {
    calculate();
  }, [items]);

  function calculate() {
    let totalCopy = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      totalFiber: 0,
    };

    items.forEach((item) => {
      totalCopy.totalCalories += item.details.calories;
      totalCopy.totalProtein += item.details.protein;
      totalCopy.totalCarbs += item.details.carbohydrates;
      totalCopy.totalFats += item.details.fat;
      totalCopy.totalFiber += item.details.fiber;
    });

    setTotal(totalCopy);
  }

  return (
    <>
    
      <div className="container diet-container">
      <Header/>
        <input type="date" onChange={(event) => setDate(new Date(event.target.value))} />

        {items.map((item) => (
          <div className="item" key={item._id}>
            <h3>{item.foodId.name} ({item.details.calories} Kcal for {item.quantity}g )</h3>
            <p>
              Protein {item.details.protein}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber{' '}
              {item.details.fiber}g
            </p>
          </div>
        ))}

        <div className="item">
          <h3>Total Calories:{total.totalCalories} Kcal of </h3>
          <p>
            Protein {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g
          </p>
        </div>
      </div>
    </>
  );
};

export default Diet;
