#
# Makefile for Missouri terrain map data
# Nathan Lawrence, December 2016
#
# Dependencies: curl, gunzip (>1.6), gdal(>2.1), mapshaper (>0.3.37)
# Also, make sure you have ~6gb of free space -- you'll need it all.
#
# Note: Since the downloaded files are not always updated,
# you MUST touch each one in the routine after unzipping.
#

# Clean up and simplify TopoJSON.
#     Right now, we have some TopoJSON, but it's pretty messy.
#     There are some artifacts created by shapefile conversion in 
#     Mapshaper called "null geometries" that are everywhere,
#     and it's still pretty big. Let's address those one at a time.
topo_slices_clean.json: topo_slices.json
	mapshaper -i topo_slices.json -filter remove-empty -o format=topojson topo_slices_clean.json

# Generate full size TopoJSON.
#     Since this will be greater than Node's 256mb string buffer size limit if we convert
#     before simpifying, we can't use Bostock's own TopoJSON tools, which can
#     only simplify after creation. Instead, we'll use Matt Bloch's Mapshaper CLI.
#     Reference here: https://github.com/mbloch/mapshaper/wiki/Command-Reference
topo_slices.json: slices_crs84.shp
	mapshaper -i slices_crs84.shp -simplify 0.5% -o format=topojson topo_slices.json


# Set proper CRS.
#     Right now, the file that we have contains a few notable issues.
#     First of all, it's HUGE, but we'll address that later. 
#     Secondly, it uses the wrong CRS (coordinate reference system).
#     Let's start by fixing the CRS.
slices_crs84.shp: slices.shp
	ogr2ogr -t_srs crs:84 slices_crs84.shp slices.shp

# Merge all the individual shapefiles.
#     Now we have 13 individual shapefiles,
#     but what we really want is just one with everything.
#     Let's make that file.
slices.shp: slice0100.shp slice0200.shp slice0300.shp slice0400.shp slice0500.shp slice0600.shp slice0700.shp slice0800.shp slice0900.shp slice1000.shp slice1300.shp
	ogr2ogr slices.shp slice0100.shp
	ogr2ogr -update -append slices.shp slice0200.shp
	ogr2ogr -update -append slices.shp slice0300.shp
	ogr2ogr -update -append slices.shp slice0400.shp
	ogr2ogr -update -append slices.shp slice0500.shp
	ogr2ogr -update -append slices.shp slice0600.shp
	ogr2ogr -update -append slices.shp slice0700.shp
	ogr2ogr -update -append slices.shp slice0800.shp
	ogr2ogr -update -append slices.shp slice0900.shp
	ogr2ogr -update -append slices.shp slice1000.shp
	ogr2ogr -update -append slices.shp slice1300.shp

# Vectorize/Polygonize all those neat slices.
#     Now we have distinct raster layers of each altitude.
#     At that altitude or above, their value is the latitude.
#     Below that, their value is null. Let's use that to our advantage
#     when we create these polygons.
#
#     Fair warning: Especially for the more detailed elevations, this takes a LOOONG time.
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
.PHONY: wipe
wipe:
	ls | grep -v Makefile | xargs rm
.PHONY: preserve
preserve:
	-mkdir preserved
	cp ./*.json ./preserved/