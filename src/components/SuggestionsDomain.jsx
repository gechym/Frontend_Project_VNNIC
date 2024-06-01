import React from 'react';

const suggestionsContainerStyle = {
    borderRadius: '8px',
    width: '800px',
    margin: '10px auto',
};

const headingStyle = {
    color: '#333',
    marginBottom: '15px',
};

const suggestionsListStyle = {
    listStyleType: 'none',
    padding: 0,
};

const suggestionItemStyle = {
    hover: 'pointer',
    color: '#555',
    backgroundColor: '#fff',
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    display: 'flex',
    alignItems: 'center',
};

const suggestionItemHoverStyle = {
    backgroundColor: '#f0f0f0',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.2)',
};

const checkmarkStyle = {
    color: '#4CAF50',
    marginRight: '10px',
};

class SuggestionItem extends React.Component {
    state = {
        isHovered: false,
    };

    toggleHover = () => {
        this.setState(prevState => ({ isHovered: !prevState.isHovered }));
    };

    render() {
        const { text } = this.props;
        const { isHovered } = this.state;
        return (
            <li
                style={{
                    ...suggestionItemStyle,
                    ...(isHovered ? suggestionItemHoverStyle : {}),
                }}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
            >
                <span style={checkmarkStyle}>✅</span>
                {text}
            </li>
        );
    }
}

const Suggestions = () => (
    <div style={suggestionsContainerStyle}>
        <h3 style={headingStyle}>Gợi ý cách đặt tên miền</h3>
        <ul style={suggestionsListStyle}>
            <SuggestionItem text="Sử dụng phần mở rộng tên miền phù hợp" />
            <SuggestionItem text="Tránh các ký tự đặc biệt và sử dụng nhiều số" />
            <SuggestionItem text="Từ khóa liên quan đến lĩnh vực kinh doanh, tránh các từ khóa nhạy cảm" />
        </ul>
    </div>
);

export default Suggestions;