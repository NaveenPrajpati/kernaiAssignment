import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowLeftIcon,MagnifyingGlassIcon,HeartIcon,ShoppingBagIcon } from "react-native-heroicons/outline";

export default function Header({likedItem}) {
  return (
    <View style={styles.container}>
    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
      <ArrowLeftIcon color={'black'} size={22} strokeWidth={2}/>
      <Text style={styles.text}>Kitchen Needs</Text>
    </View>
      <View style={{flexDirection:'row',gap:25,alignItems:'center'}}>
      <MagnifyingGlassIcon color={'black'} size={22} strokeWidth={2}/>
      <View style={{position:'relative'}}>
     {likedItem.length>0 && <Text style={{position:'absolute',backgroundColor:'red',color:'white',fontSize:10,paddingHorizontal:4,borderRadius:10,fontWeight:'500',right:-2,zIndex:2}}>{likedItem.length}</Text>}
      <HeartIcon color={'black'} size={22} strokeWidth={2}/>
      </View>
      <ShoppingBagIcon color={'black'} size={22} strokeWidth={2}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderTopWidth:.5,
    borderBottomWidth:1,
    borderColor:'lightgrey',
    padding:12
  },
  text:{color:'black',fontSize:18,fontWeight:'600'}
})