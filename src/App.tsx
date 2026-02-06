//  import { useState } from 'react'
//  import reactLogo from './assets/react.svg'
//  import viteLogo from '/vite.svg'
import { useState } from 'react';
import './App.css'
import SidebarMenu from './components/SideBarMenu';
import MainLayout from './layouts/MainLayout';
import CustomersPage from "./pages/CustomersPage";
import DeparmentsPage from './pages/DepartmentsPage';

function App() {
  const [page, setPage] = useState("customers");
  function renderContent() {
    switch (page) {
      case "customers":
        return <CustomersPage />;
      case "departments":
        return <DeparmentsPage />;
      default:
        return <CustomersPage />;
    }
  }
  return (
    <MainLayout
      sidebar={<SidebarMenu current={page} onChange={setPage} />
      }
      content={renderContent()} />
  )


  // return (
  //   <body className="min-h-screen bg-slate-900 flex items-center justify-center">
  //     <script src="https://cdn.tailwindcss.com"></script>
  //     <h1 className="text-4xl font-bold text-sky-400 drop-shadow-lg">
  //       ¡Tailwind funcionando!
  //     </h1>
  //     <div className="flex items-center justify-center">
  //       <a href="https://github.com/Gerbetwo" target="_blank"
  //         className="flex items-center p-6 bg-slate-750 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-sm group">

  //         <img className="w-20 h-20 rounded-full border-2 border-indigo-500 p-0.5" src="https://github.com/Gerbetwo.png" alt="GitHub Profile"></img>

  //           <div className="ml-4">
  //             <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
  //               Gebertwo
  //             </h3>
  //             <p className="text-sm text-gray-600">
  //               I'm a developer building cool things on GitHub. Check out my repositories!
  //             </p>
  //           </div>
  //       </a>
  //     </div>
  //   </body>
  // )

  //  const [count, setCount] = useState(0)
  //  return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
