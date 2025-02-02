const musicCollection = {
  albums: [
    { title: "Миллион алых роз", artist: "Алла Пугачева", year: "1978" },
    { title: "Дельтаплан", artist: "Валерий Леонтьев", year: "1982" }    
  ],
  
  [Symbol.iterator]: function() {
    let index = 0;
    const albums = this.albums;
    
    return {
      next: function() {
        if (index < albums.length) {
          return { value: albums[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};


for (const album of musicCollection) {
  console.log(`${album.title} - ${album.artist} (${album.year})`);
}