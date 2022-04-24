import React, { useRef, useState } from 'react';
import { FlatList, StatusBar, ViewToken } from 'react-native';

import { 
 Container,
 ImageIndexes,
 ImageIndex,
 CarImageWrapper,
 CarImage,
} from './styles';

interface Props {
  imagesUrl: string[];
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
        barStyle='dark-content
        '
        backgroundColor='transparent'
        translucent
      />
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => 
            <ImageIndex 
              key={String(index)}
              active={imageIndex === index}
            />
          )
        }
      </ImageIndexes>

        <FlatList
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({item}) => 
            <CarImageWrapper>
              <CarImage
                source={{uri: item }}
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