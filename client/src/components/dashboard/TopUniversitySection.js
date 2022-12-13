import "../../styles/main.scss";
import { connect } from "react-redux";
import { startUniversityLoad } from "../../actions/universities";
import UniversityCard from "./UniCard.js";
import { useGetUniversitiesQuery } from "../../api/uniApi.js";
import {CardGroup} from "react-bootstrap"

function UniversitySection(props) {
  const {
    data: Universities,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUniversitiesQuery();

  var items = [];
  if (isLoading) {
    items = <p>Loading...</p>;
  } else if (isSuccess) {
    items = Universities.map((uni) => (
      <UniversityCard
        key={uni._id}
        id={uni._id}
        name={uni.name}
        description={uni.description}
        startUniversityLoad={props.startUniversityLoad}
      />
    ));
  } else if (isError) {
    items = <p>Loading</p>;
  }

  return (
    <div className="dashboardSection PopUniversity">
      <h2 className="title">Top Universities</h2>
      <div className="dashboardTile">
        <ul className="cardsList"><CardGroup>{items}</CardGroup></ul>
        </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { startUniversityLoad })(
  UniversitySection
);

// export default UniversitySection;
