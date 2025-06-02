import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import SetBackendUrl from './SetBackendUrl';
import { useBackend } from '../context/BackendContext';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const { backendUrl } = useBackend();

  useEffect(() => {
    if (backendUrl) {
      setShowModal(false);
    }
  }, [backendUrl]);

  return (
    <>
      <div className='bg-background w-full flex justify-between items-center px-8 py-4'>
        <Link to="/">
          <button className='text-primary hover:text-accent'>
            <FaHome className='w-8 h-8' />
          </button>
        </Link>

        {backendUrl ? (
          <div className="flex">
            <input type="text" value={backendUrl} readOnly className="bg-secondary border border-primary p-2 rounded-xl text-accent font-bold focus:outline-none" />
            <button
              onClick={() => setShowModal(true)}
              className='bg-primary text-white p-2 text-md font-bold rounded-xl hover:bg-accent ml-2'
            >
              Ubah URL Backend
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className='bg-primary text-white p-2 text-md font-bold rounded-xl hover:bg-accent'
          >
            Set URL Backend
          </button>
        )}

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-3xl flex justify-center items-center z-50">
          <div className="relative bg-background rounded-xl shadow-2xl p-6 w-[90%] max-w-md">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-red-600 text-2xl font-bold hover:text-red-800"
            >
              &times;
            </button>
            <SetBackendUrl />
          </div>
        </div>
      )}
    </>
  );
}
