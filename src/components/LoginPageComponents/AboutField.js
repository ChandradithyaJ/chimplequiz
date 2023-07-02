const AboutField = () => {
    return(
        <div className="about-field">
            <div className="about-text">
                <h2>About</h2>
                <div className="underline1"></div>
                <p>
                    Incepted in the year 2015, Chimple Learning is an app from Sutara Learning Foundation, a non-profit organization dedicated to the foundational education of children.
                </p>
                <p>
                    Chimple is designed to bring high-quality learning experiences to all the students – regardless of access to school or other educational resources – Chimple app uses best practices and research in game design, pertaining to literacy and numeracy of early education, to support children’s engagement in learning.
                </p>
            </div>
            <div className="children-studying-container">
                <img
                    src={require("../../images/children-studying-2.jpg")}
                    className="children-studying-pic"
                    alt="Girl using a Chimple App"
                />
            </div>
        </div>
    )
}

export default AboutField