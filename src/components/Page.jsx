import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "../styles/Page.scss";
import InfoIcon from '@mui/icons-material/Info';
import Button from "@mui/material/Button";
import { fetchFavorite } from "./fetchData";
import { postDataToServer } from "./postData"; // Assuming 'postData.js' is in the same directory as 'Page.js'
import { deletePost } from "./deleteData";


const Page = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  // State to manage the form input
  const [formData, setFormData] = useState({
    id: "",
    provider: "",
    email: "",
    password: "",
    category: "",
  });

  const { provider, email, password, category } = formData;


  // State to manage the dropdown selection
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchFavorite()
      .then(data => {
        setPosts(data);
        console.log("Hasil",posts);
      })
      .catch(error => {
        // Handle the error here if necessary
      });
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setMeals(prevPosts => prevPosts.filter(post => post.id !== id));
        window.confirm("Are you sure?")
      })
      .catch(error => {
        // Handle the error here if necessary
      });
  };

  const handleDetailClick = (id) => {
    navigate(`/detail/${id}`);

}

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // Here, you can add the logic to filter the table data based on the selected category
  };

  const filteredPosts =
    selectedCategory !== "all"
      ? posts.filter((post) => post.category === selectedCategory)
      : posts;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the password is less than 6 characters
    if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return; // Don't proceed with the submission
    }
    
    try {
      const data = {
        provider,
        email,
        password,
        category,
      };
  
      const response = await postDataToServer(data);
      console.log(response, "Hasil Response");
  
      // Update the posts state with the new data
      setPosts((prevPosts) => [...prevPosts, response]);
  
      // Clear the form input fields
      setFormData({
        provider: "",
        email: "",
        password: "",
        category: "",
      });
    } catch (error) {
      console.log('Error Posting Data', error);
    }
  };

  return (
    <body>
      <div className="isi-konten">
        <div className="isi-konten-kiri">

          <div className="table-utama">
          <div className="toggle-bar-category">
              <FormControl
                variant="outlined"
>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TableContainer>
              <Table sx={{ maxWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "1%" }}>id</TableCell>
                    <TableCell align="right">Provider</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Password</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow
                      key={post.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="post">
                        {post.id}
                      </TableCell>
                      <TableCell align="right">{post.provider}</TableCell>
                      <TableCell align="right">{post.email}</TableCell>
                      <TableCell align="right">  {post.password.replace(/./g, '*')}</TableCell>
                      <TableCell align="right">{post.category}</TableCell>
                      <TableCell align="right">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <InfoIcon
                            style={{ marginRight: "8px", cursor: "pointer" }}
                            onClick={() => { handleDetailClick(post.id)}} />
                          <DeleteOutlineIcon style={{ cursor: "pointer" }} onClick={() => {handleDelete(post.id)}}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="form-isian">
          <div className="isi-konten-kanan">
            <div className="form-isi">
            <form  onSubmit={handleFormSubmit}>
              <div className="input-container">
                <label htmlFor="provider" className="label">
                  Provider:
                </label>
                <input
                  type="text"
                  name="provider"
                  value={formData.provider}
                  placeholder="Provider"
                  onChange={handleFormChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="email" className="label">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleFormChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label">
                  Password:
                </label>
                <input
                  name="password"
                  type="password" 
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleFormChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="category" className="label">
                  Category:
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  placeholder="Category"
                  onChange={handleFormChange}
                />
              </div>
              <Button type="submit" className="button">
                Submit
              </Button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Page;
