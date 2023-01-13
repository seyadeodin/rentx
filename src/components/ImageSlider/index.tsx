import React, { useRef, useState } from 'react';
import { FlatList, StatusBar, ViewToken } from 'react-native';
import { Bullet } from '../../Bullet';

import { 
 Container,
 ImageIndexes,
 ImageIndex,
 CarImageWrapper,
 CarImage,
} from './styles';

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props){
  const [ imageIndex, setImageIndex ] = useState(0)

  //useRef: allow us to update only one component of the elemen tree when a va lue
  // is changed
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index)
  });


  return(
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <ImageIndexes>
        {
          imagesUrl.map((item, index) => 
            <Bullet
              key={item.id}
              active={imageIndex === index}
            />
          )
        }
      </ImageIndexes>

        <FlatList
          data={imagesUrl}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <CarImageWrapper>
              <CarImage
                source={{uri: item.photo }}
                resizeMode='contain'
              />
            </CarImageWrapper>
          }
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          // 
        />
    </Container>
  )
}