import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import axios from "axios";

function UniversityCard(props) {
    const navigate = useNavigate();

    const auth = useSelector(state => state.authReducer);
    // useEffect(() => {
    // }, [auth]);
    var shortlistedUniversities = [...auth.user.shortlistedUniversities];

    var isShortListed = shortlistedUniversities.includes(props.id);

    const navToUniHandler = () => {
        console.log("uniLoadHandler", props.id);
        props.startUniversityLoad(props.id);
        navigate("/university");
    };

    const shortlistHandler = e => {
        e.preventDefault();
        // console.log("shortlistHandler", props.id);
        var shortlistedUniversities = [...auth.user.shortlistedUniversities];
        // console.log("shortlistHandler UniShortlist", shortlistedUniversities);
        // add to shortlist if not shortlisted
        if (!isShortListed) {
            console.log("shortlistHandler add", props.id);
            shortlistedUniversities.push(props.id);
        } else {
            console.log("shortlistHandler remove", props.id);
            shortlistedUniversities = shortlistedUniversities.filter(
                uni => uni !== props.id
            );
        }
        const user = auth.user;
        shortlistedUniversities = [...new Set(shortlistedUniversities)];
        props.updateProfile(auth.user._id, { ...user, shortlistedUniversities });
    };
    // < i class="bi bi-bookmark-heart" ></i >
    // <i class="bi bi-bookmark-heart-fill"></i>
    var shortlistedIcon = shortlistedUniversities.includes(props.id) ? (
        // <FaStar />
        <BookmarkHeartFill />
    ) : (
        // <FaRegStar />
        <BookmarkHeart />
    );
    var ButtonVariant = shortlistedUniversities.includes(props.id)
        ? "success"
        : "outline-primary";
    var ButtonText = shortlistedUniversities.includes(props.id)
        ? "Shortlisted!!"
        : "Shortlist";
    // outline-primary
    // success
    const [imageURL, setImageURL] = useState("")

    useEffect(() => {
        axios.get("/universities/university-images/" + props.id + "/0",
         {responseType: "blob"})
         .then(img => {
            setImageURL(URL.createObjectURL(img.data));
         });    
    });

    var card = (
        <li className="cards__item">
            <Card bg="Primary" className="UniCard">
                <Card.Img variant="top" className="card-img" src={imageURL} />
                
                <Card.Body>
                    <div onClick={() => navToUniHandler()}>
                        <Card.Title> {props.name} </Card.Title>
                        <Card.Text>{props.description}</Card.Text>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button variant={ButtonVariant} onClick={shortlistHandler}>
                        {shortlistedIcon} {ButtonText}
                    </Button>
                </Card.Footer>
            </Card>
        </li>
    );
    return card;
}

export default connect(null, { updateProfile })(UniversityCard);
// export default UniversityCard;
