import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUniversitiesByIdsQuery } from "../../api/uniApi.js";
import UniversityCard from "./UniCard.js";
import { connect } from "react-redux";
import { startUniversityLoad } from "../../actions/universities";

function ShortlistSection(props) {
    const auth = useSelector(state => state.authReducer);
    const shortlistedIds = auth.user.shortlistedUniversities;
    const {
        data: Universities,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetUniversitiesByIdsQuery(shortlistedIds, auth);

    var items = [];
    if (isLoading) {
        items = <p>Loading...</p>;
    } else if (isSuccess) {
        if (Universities === null) {
            items = <p>No shortlisted universities</p>;
        } else {
            items = Universities.map(uni => (
                <UniversityCard
                    key={uni._id}
                    id={uni._id}
                    name={uni.name}
                    description={uni.description}
                    startUniversityLoad={props.startUniversityLoad}
                />
            ));
        }
    } else if (isError) {
        items = <p>Loading</p>;
    }

    return (
        <div>
            <h3>Shortlist Section</h3>
            <div className="dashboardTile">
                <ul className="cardsList">{items}</ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer,
    };
};

export default connect(mapStateToProps, { startUniversityLoad })(ShortlistSection);
