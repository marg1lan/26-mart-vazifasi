import{ useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCards(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const openModal = card => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="container">
      <p className='paragref'>Cards</p>
      <div className="cards">
        {cards.map(card => (
          <div className="one-card" key={card.id} onClick={() => openModal(card)}>
            <div className="img">
              <img src={card.images[0]} alt="rasm bor" />
            </div>
            <div className="price">
              <h2>${card.price}</h2>
            </div>
            <div className="desc">
              <h3>{card.name}</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="img">
              <img src={selectedCard.images[0]} alt="rasm bor" />
            </div>
            <div className="price">
              <h2>${selectedCard.price}</h2>
            </div>
            <div className="desc">
              <h3>{selectedCard.name}</h3>
              <p>{selectedCard.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
