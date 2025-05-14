// This function takes a rating number and returns an object with backgroundColor and textColor properties based on the rating value.
export const getRatingStyles = (rating: number) => {
    let backgroundColor = "";
    let textColor = "";
  
    if (rating < 2) {
      backgroundColor = "bg-red-100";
      textColor = "text-red-800";
    } else if (rating >= 2 && rating < 3.5) {
      backgroundColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (rating >= 3.5) {
      backgroundColor = "bg-green-100";
      textColor = "text-green-800";
    }
  
    return { backgroundColor, textColor };
  };
  