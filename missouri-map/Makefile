#
# Makefile for Missouri terrain map data
# Nathan Lawrence, December 2016
#
# Dependencies: curl, gunzip (>1.6), gdal(>2.1), topojson-client
#
# Note: Since the downloaded files are not always updated,
# you MUST touch each one in the routine after unzipping.
#


# Merge all the individual shapefiles.
#     Now we have 13 individual shapefiles,
#     but what we really want is just one with everything.
#     Let's make that file.
slices.shp: slice0100.shp slice0200.shp slice0300.shp slice0400.shp slice0500.shp slice0600.shp slice0700.shp slice0800.shp slice0900.shp slice1000.shp slice1300.shp
	ogr2ogr slices.shp slice0100.shp
	ogr2ogr -update -append slices.shp slices0200.shp
	ogr2ogr -update -append slices.shp slices0300.shp
	ogr2ogr -update -append slices.shp slices0400.shp
	ogr2ogr -update -append slices.shp slices0500.shp
	ogr2ogr -update -append slices.shp slices0600.shp
	ogr2ogr -update -append slices.shp slices0700.shp
	ogr2ogr -update -append slices.shp slices0800.shp
	ogr2ogr -update -append slices.shp slices0900.shp
	ogr2ogr -update -append slices.shp slices1000.shp
	ogr2ogr -update -append slices.shp slices1100.shp
	ogr2ogr -update -append slices.shp slices1200.shp
	ogr2ogr -update -append slices.shp slices1300.shp

# Vectorize/Polygonize all those neat slices.
#     Now we have distinct raster layers of each altitude.
#     At that altitude or above, their value is the latitude.
#     Below that, their value is null. Let's use that to our advantage
#     when we create these polygons.
slice0100.shp: slice0100.tif
	gdal_polygonize.py slice0100.tif -f "ESRI Shapefile" slice0100.shp slice_0100 elev
slice0200.shp: slice0200.tif
	gdal_polygonize.py slice0200.tif -f "ESRI Shapefile" slice0200.shp slice_0200 elev
slice0300.shp: slice0300.tif
	gdal_polygonize.py slice0300.tif -f "ESRI Shapefile" slice0300.shp slice_0300 elev
slice0400.shp: slice0400.tif
	gdal_polygonize.py slice0400.tif -f "ESRI Shapefile" slice0400.shp slice_0400 elev
slice0500.shp: slice0500.tif
	gdal_polygonize.py slice0500.tif -f "ESRI Shapefile" slice0500.shp slice_0500 elev
slice0600.shp: slice0600.tif
	gdal_polygonize.py slice0600.tif -f "ESRI Shapefile" slice0600.shp slice_0600 elev
slice0700.shp: slice0700.tif
	gdal_polygonize.py slice0700.tif -f "ESRI Shapefile" slice0700.shp slice_0700 elev
slice0800.shp: slice0800.tif
	gdal_polygonize.py slice0800.tif -f "ESRI Shapefile" slice0800.shp slice_0800 elev
slice0900.shp: slice0900.tif
	gdal_polygonize.py slice0900.tif -f "ESRI Shapefile" slice0900.shp slice_0900 elev
slice1000.shp: slice1000.tif
	gdal_polygonize.py slice1000.tif -f "ESRI Shapefile" slice1000.shp slice_1000 elev
slice1300.shp: slice1300.tif
	gdal_polygonize.py slice1300.tif -f "ESRI Shapefile" slice1300.shp slice_1300 elev


# Raster slicing
#     At this point, we have one large .e00 image of the landscape.
#     We need to use GDAL's gdal_calc module to create individual
#     raster "slices" of the terrain.
#
#     This will look like a lot of repetition, and that's because it is.
#     We want to calculate and make each of these independently for maximum control.
slice0100.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0100.tif --calc="100*(A>100)" --NoDataValue=0
slice0200.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0200.tif --calc="200*(A>200)" --NoDataValue=0
slice0300.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0300.tif --calc="300*(A>300)" --NoDataValue=0
slice0400.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0400.tif --calc="400*(A>400)" --NoDataValue=0
slice0500.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0500.tif --calc="500*(A>500)" --NoDataValue=0
slice0600.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0600.tif --calc="600*(A>600)" --NoDataValue=0
slice0700.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0700.tif --calc="700*(A>700)" --NoDataValue=0
slice0800.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0800.tif --calc="800*(A>800)" --NoDataValue=0
slice0900.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0900.tif --calc="900*(A>900)" --NoDataValue=0
slice1000.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice1000.tif --calc="1000*(A>1000)" --NoDataValue=0
slice1300.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice1300.tif --calc="1300*(A>1300)" --NoDataValue=0


# Unzip
msdis_mo_dem_60m.e00: msdis_mo_dem_60m.e00.gz
	gunzip -k msdis_mo_dem_60m.e00.gz
	touch msdis_mo_dem_60m.e00.gz # Makes sure it looks to Make like this file is brand new.

# Download
msdis_mo_dem_60m.e00.gz:
	# 60 meter Digital Elevation Model data of the full state of Missouri
	# MSDIS provides the following description:
	#       By popular demand a 60 meter DEM of the whole state is now available.
	#       The coverage was assembled by merging/mosaicing all of the 7.5 minute
	#       USGS quadrangle DEM data.
	#
	#       Documentation page: http://msdis.missouri.edu/data/dem/
	curl -o msdis_mo_dem_60m.e00.gz 'ftp://msdis.missouri.edu/pub/state/st_dem.e00.gz'


# Cleanup
clean:
	ls | grep -v Makefile | xargs rm