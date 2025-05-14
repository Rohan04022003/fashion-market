import { ProductType } from "@/types/types";
import { useNavigate } from "react-router-dom"

const useProductNavigation = () => {

    const navigate = useNavigate();

    const goToProduct = (category: string, productId: number, product: ProductType) => {
        navigate(`/${category}/${productId}`,
            {
                state: { productId, product },
            }
        );

    };

    return { goToProduct }

}

export default useProductNavigation