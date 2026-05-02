import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/users";
import { getAllMovies } from "../api/movies.js";
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, moviesRes] = await Promise.all([
          getCurrentUser(),
          getAllMovies(),
        ]);

        setUser(userRes?.data?.user ?? null);

        if (moviesRes?.success) {
          setMovies(moviesRes.data || []);
        } else {
          throw new Error(moviesRes?.message || "Failed to load movies");
        }
      } catch (err) {
        setError(err.message || "Failed to load home page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>...Loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
      }}
    >
      <h2>Home Component</h2>
      <h3>Name: {user?.name ?? "Guest"}</h3>
      <h3>Email: {user?.email ?? "Not available"}</h3>

      <div style={{ marginTop: 24 }}>
        <h3>Available Movies</h3>
        {movies.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 12,
                  cursor: "pointer",
                  transition: "box-shadow 0.2s ease",
                }}
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: 260,
                      objectFit: "cover",
                      borderRadius: 6,
                      marginBottom: 12,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                      borderRadius: 6,
                      marginBottom: 12,
                    }}
                  >
                    No poster available
                  </div>
                )}
                <div>
                  <strong>{movie.title}</strong>
                  <div style={{ color: "#555", marginTop: 6 }}>
                    {movie.genre ? `${movie.genre}` : "Unknown genre"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
