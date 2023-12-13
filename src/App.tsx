import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Filterbar from './components/Filterbar'
import { HeartIcon } from "react-native-heroicons/outline";


export default function App() {

  const url = 'https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100'

  const [fetchedData, setFetchedData] = useState([])
  const [likedItem, setLikedItem] = useState([])
  const [currentItem,setCurrentItem]=useState(null)

  async function getAllData() {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        // Handle the data from the response
        setFetchedData(data.object)
        console.log(JSON.stringify(data, null, 2));
      })
      .catch(error => {
        // Handle errors
        console.error('Fetch error:', error.index);
      });
  }

  useEffect(() => {
    getAllData()
  }, [])

  const screenW = useWindowDimensions().width
  const screenH = useWindowDimensions().height

  const onViewCallBack = useCallback((viewableItems:any)=> {
    console.log('Visible items are', viewableItems.changed[viewableItems.changed.length-1].index);
    setCurrentItem(viewableItems.changed[viewableItems.changed.length-1].index)
// Use viewable items in state or as intended
}, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Header likedItem={likedItem}/>
      <Filterbar fetchedData={fetchedData} currentItem={currentItem}/>
      <FlatList
        numColumns={2}
        data={fetchedData}
        onViewableItemsChanged={onViewCallBack}
        keyExtractor={item => item.id}
        columnWrapperStyle={{ justifyContent: 'center', gap: 5 }}
        renderItem={({ item, index }) => (
          <View style={{ width: screenW * .48 ,marginVertical:10}}>
            <View style={{ position: 'relative' }}>
              <Pressable style={styles.likeButton} onPress={() => {
                if (likedItem.includes(index)) {
                  const nn = likedItem.filter(it => it != index)
                  setLikedItem(nn)
                } else
                  setLikedItem([...likedItem, index])
              }}>
                {(likedItem.includes(index)) ?
                  <HeartIcon fill={'red'} /> :
                  <HeartIcon color={'black'} />}
              </Pressable>
              <Image source={{ uri: item.mediaUrl }} alt='no' width={screenW * .48} height={screenW * .5} style={{ borderRadius: 6 }} />
            </View>
            <View style={{ gap: 2 }}>
              <Text style={{ color: 'black', fontSize: 17, fontWeight: '600',marginVertical:4 }}>{item?.variants[0]?.variant}</Text>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item?.category[0]?.name}</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={[styles.text]}>₹{item?.variants[0]?.sellingPrice}</Text>
                <Text style={{ color: 'red', fontSize: 15, fontWeight: '500', textDecorationLine: 'line-through' }}>₹{item?.variants[0]?.mrp}</Text>
              </View>
            </View>
          </View>
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 6, backgroundColor: 'white' 
  },
  likeButton:{
    position: 'absolute', zIndex: 2, right: 5, top: 5
  },
  text:{
    color: '222', fontSize: 15, fontWeight: '500'
  }
})