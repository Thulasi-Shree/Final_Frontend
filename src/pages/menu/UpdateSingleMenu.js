import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import '../user/Profile.css';
import CustomAlert from 'components/utilities/Alert';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });
  const [mealTypeCategory, setMealTypeCategory] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantBranch, setRestaurantBranch] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const dietaryCategory = [
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Other'
  ];
  const mealCategory = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Other'
  ];

  // const navigate = useNavigate();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const onIsAvailableChange = () => {
    setIsAvailable((prevIsAvailable) => !prevIsAvailable);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('isAvailable', isAvailable || false);
    formData.append('description', description);
    formData.append('restaurantId', restaurantId);
    formData.append('restaurantBranch', restaurantBranch);
    formData.append('mealTypeCategory', mealTypeCategory);
    formData.append('dietaryPreferenceCategory', dietaryPreferenceCategory);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('imagesCleared', imagesCleared);

    try {
      // Use axios to send the form data
      await axios.put(`/api/admin/product/${productId}`, formData);

      // alert('Product Updated Successfully!');
      setAlert({ message: 'Product Updated Successfully!', type: 'success' });


      setImages([]);
    } catch (error) {
      // alert(error.message || 'An error occurred');
      setAlert({ message: error.message || 'An error occurred', type: 'error' });

    }
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };
  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };


  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        const product = response.data.menu;

        setName(product.name);
        setPrice(product.price);
        setIsAvailable(product.isAvailable);
        setDescription(product.description);
        setRestaurantId(product.restaurantId);
        setRestaurantBranch(product.restaurantBranch);
        setDietaryPreferenceCategory(product.dietaryPreferenceCategory);
        setMealTypeCategory(product.mealTypeCategory);

        const images = product.images.map((image) => image.image);
        setImagesPreview(images);
      } catch (error) {
        alert(error.message || 'An error occurred');
      }
    };

    getProductDetails();
  }, [productId]);

  return (
    <div className="bg-white py-1 text-black">
      <div className="container-fluid">
        <div className="row">
          {/* <div className=""> */}
          <div
            className="col-lg-8  mx-auto col-xs-12 col-md-10 my-5"
          >
            <Card className='Cardimg123'>
            {alert.message && (
        <CustomAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
            <form
              onSubmit={submitHandler}
              className="shadow-lg p-4"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group mt-2">
                <label htmlFor="name_field">Name</label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  type="text"
                  id="name_field"
                  className="form-control mt-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group mt-2">
                <label htmlFor="price_field">Price</label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  type="text"
                  id="price_field"
                  className="form-control mt-2"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group mt-2">
                <label htmlFor="description_field">Description</label>
                <textarea
                  style={{ backgroundColor: 'white', color: 'black' }}
                  className="form-control mt-2"
                  id="description_field"
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="form-group mt-2">
                <label htmlFor="category_field">
                  Dietary Preference Category
                </label>
                <select
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={dietaryPreferenceCategory}
                  onChange={(e) => setDietaryPreferenceCategory(e.target.value)}
                  className="form-control mt-2"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {dietaryCategory.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="category_field">Meal Type Category</label>
                <select
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={mealTypeCategory}
                  onChange={(e) => setDietaryPreferenceCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {mealCategory.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="stock_field">Is Available</label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  type="checkbox"
                  id="stock_field"
                  className="form-check-input mt-2"
                  onChange={onIsAvailableChange}
                  checked={isAvailable}
                />
              </div>

              <div className="form-group mt-2">
                <label htmlFor="seller_field">Restaurant Id</label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  type="text"
                  id="seller_field"
                  className="form-control mt-2"
                  readOnly
                  onChange={(e) => setRestaurantId(e.target.value)}
                  value={restaurantId}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="seller_field">Restaurant Branch</label>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  type="text"
                  id="seller_field"
                  className="form-control mt-2"
                  readOnly
                  onChange={(e) => setRestaurantBranch(e.target.value)}
                  value={restaurantBranch}
                />
              </div>

              <div className="form-group mt-2">
                <label>Images</label>

                <div className="custom-file mt-2">
                  <input
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: '30px'
                    }}
                    type="file"
                    name="product_images"
                    className="form-control mt-2"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />

                  <label className="custom-file-label mt-2" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {imagesPreview.length > 0 && (
                  <span
                    className="m-3"
                    onClick={clearImagesHandler}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-trash" />
                  </span>
                )}
                {imagesPreview.map((image) => (
                  <img
                    className="image-preview mt-2"
                    key={image}
                    src={image}
                    alt="Image Preview"
                    width="55"
                    height="52"
                  />
                ))}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  id="login_button"
                  type="submit"
                  // className="btn btn-block py-3"
                  className="btn my-3 px-4 btn rounded px-5 "
                >
                  UPDATE
                </button>
              </div>
            </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
