import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/repo/repos', {
          withCredentials: true // Ensure cookies are sent with the request
        });
        setRepos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleDeploy = (repo) => {
    const deployRepos = async () => {
      try {
        const data=repo
        const response = await axios.post('http://localhost:8000/repo/deploy',data, {
          withCredentials: true
        });
      } catch (err) {
        setError(err.message);
      } 
    };
    deployRepos();
    alert(`Deploying ${repo.name}`);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Repositories</h1>
      <ul className="space-y-4">
        {repos.map(repo => (
          <li key={repo.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-md">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {repo.name}
            </a>
            <button
              onClick={() => handleDeploy(repo)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
            >
              Deploy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
