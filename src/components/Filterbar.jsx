import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AdjustmentsHorizontalIcon,AdjustmentsVerticalIcon} from "react-native-heroicons/outline";


export default function Filterbar({fetchedData,currentItem}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize:16,color:'#939daf',fontWeight:'500'}}>{currentItem}/{fetchedData.length} Products</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 15 }}>
      <View style={{flexDirection:'row',gap:2,alignItems:'center'}}>
      <AdjustmentsVerticalIcon color={'black'} size={18} strokeWidth={1}/>
        <Text style={styles.text}>Sort</Text>
      </View>
      <View style={{flexDirection:'row',gap:2,alignItems:'center'}}>
      <AdjustmentsHorizontalIcon color={'black'} size={18} strokeWidth={1}/>
        <Text style={styles.text}>Filter</Text>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:8
  },
  text:{
    fontSize:16,color:'black',fontWeight:'400'
  }
})