// import React, { useState, useEffect } from "react";

// function BucketList() {
//   const [buckets, setBuckets] = useState([]);

//   useEffect(() => {
//     fetchBuckets();
//   }, []);

//   const fetchBuckets = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/buckets");
//       const data = await response.json();
//       setBuckets(data);
//     } catch (error) {
//       console.log("Error fetching buckets:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Bucket Count: {buckets.length}</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Region</th>
//             <th>Creation Date</th>
//             <th>Bucket Link</th>
//             <th>S3 Static Endpoint</th>
//           </tr>
//         </thead>
//         <tbody>
//           {buckets.map((bucket) => (
//             <BucketItem key={bucket.Name} bucket={bucket} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function BucketItem({ bucket }) {
//   const { Name, Region, CreationDate, BucketLink, S3StaticEndpoint } = bucket;

//   return (
//     <tr>
//       <td>{Name}</td>
//       <td>{Region}</td>
//       <td>{CreationDate}</td>
//       <td>
//         <a href={BucketLink} target="_blank" rel="noopener noreferrer">
//           Open Bucket
//         </a>
//       </td>
//       <td>
//         <a href={S3StaticEndpoint} target="_blank" rel="noopener noreferrer">
//           Open Static Endpoint
//         </a>
//       </td>
//     </tr>
//   );
// }

// function App() {
//   return (
//     <div>
//       <h1>Bucket List</h1>
//       <BucketList />
//     </div>
//   );
// }

// export default App;
