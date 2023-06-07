import React, { useState, useEffect } from "react";

function Details({ data }) {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= scrollHeight) {
        setVisibleItems((prevItems) => {
          const nextItemIndex = prevItems.length;
          if (nextItemIndex < data.length) {
            return [...prevItems, data[nextItemIndex]];
          }
          return prevItems;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      setVisibleItems([data[0]]);
    }
  }, [data]);

  return (
    <div>
      {visibleItems.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-header">
            <h5>{item.TitleText}</h5>
          </div>
          <div className="card-body">
            <p>{item.DescriptionText}</p>
            {item.MediaIURL && (
              <audio controls>
                <source src={item.MediaIURL} type="audio/mpeg" />
              </audio>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Details;
