image-stream
============

DataSifft HTTP POST REST endpoint - stream instagram photos from a DataSift push delivery to a browser via Socket.io.



Sample CSDL:

```
// Instagram only?
//links.meta.opengraph.site_name == "Instagram"



links.meta.opengraph.image exists
and 

(
  interaction.geo geo_radius "51.14855570202184,-2.7191162109375:7.056013430905648"
  or
  // keywords but only instagram
  (
   interaction.content contains "glastonbury"
   and 
   links.meta.opengraph.site_name == "Instagram"
  )
)```


