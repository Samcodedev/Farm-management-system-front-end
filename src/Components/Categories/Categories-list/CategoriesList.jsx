import React, {useState} from 'react'
import './CategoriesList.css'
import ProductCards from '../../ReuseComponent/ProductCards/ProductCards'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

const CategoriesList = ({data}) => {

  const [listedProduct, listedProductFunc] = useState()
  const savedStock = localStorage.getItem('listedstocks')


  setTimeout(() => {
    listedProductFunc(
      (data? data : JSON.parse(savedStock)).map((item)=>{
        return(
                  <ProductCards 
                    stockCategories={item.stockCategories}
                    stockBreed={item.stockBreed}
                    stockGroup={item.stockGroup}
                    stockImage={item.stockImage}
                    stockAge={item.stockAge}
                    stockGeder={item.stockGeder}
                    stockWeight={item.stockWeight}
                    stockCurrentLocation={item.stockCurrentLocation}
            
                    stockPrice={item.stockPrice}
                    stockDescription={item.stockDescription}
                    stockReview={item.stockReview}
                    
                    userName={item.userName}
                    userEmail={item.userEmail}
                    userPhone={item.userPhone}
                    data={item}
                  />
        )
      })
    )
  }, 1000);

  return (
    <div className='CategoriesList'  data-carousel>
      <div className="Categories-grouping">
          <ScrollingCarousel show={2} slide={2} transition={0.5} useArrowKeys={true}>
            {listedProduct}
          </ScrollingCarousel>
      </div>
    </div>
  )
}

export default CategoriesList
