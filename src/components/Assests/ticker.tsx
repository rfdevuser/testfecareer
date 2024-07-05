"use client"
import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { MY_TICKER } from '@/utils/gql/GQL_QUERIES';

interface NewsItem {
  title: string;
}



const TickerWrapper: React.FC = () => {
  const client = useApolloClient();
  const [fetchedNewsItems, setFetchedNewsItems] = useState<NewsItem[]>([]);

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: MY_TICKER,
      });
      console.log("data", data.tickerInfo);
      if (data && data.tickerInfo) {
        setFetchedNewsItems(data.tickerInfo); // Update the state with fetched news items
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state here if needed
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div id="cbwrap">
      {/* <h1 id="cbtitle">title here if required</h1> */}

      {/* for horizontal ticker use this */}
      <div className="hwrap">
        <div className="hmove">
          {fetchedNewsItems.map((item, index) => (
            <div key={index} className="hitem">
              {item}
            </div>
          ))}
          {/* <div className="hitem">New fashion design course for 2024-2025 batch starting next month! Enroll now!</div>
          <div className="hitem">Internship opportunities available at top fashion houses. Apply now!</div>
          <div className="hitem">Learn from industry experts at our upcoming workshop series.</div>
          <div className="hitem">Exciting new collection launch next week! Stay tuned for updates.</div> */}
        </div>
      </div>

      {/* for vertical ticker use this */}
      {/* <div className="vwrap">
        <div className="vmove">
          <div className="vitem">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="vitem">Aliquam consequat varius consequat.</div>
          <div className="vitem">Fusce dapibus turpis vel nisi malesuada sollicitudin.</div>
          <div className="vitem">Pellentesque auctor molestie orci ut blandit.</div>
        </div>
      </div> */}
    </div>
  );
};

export default TickerWrapper;
