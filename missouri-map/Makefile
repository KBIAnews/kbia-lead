#
# Makefile for Missouri terrain map data
# Nathan Lawrence, December 2016
#
# Dependencies: curl, gunzip (>1.6), gdal(>2.1), topojson-client
#
# Note: Since the downloaded files are not always updated,
# you MUST touch each one in the routine after unzipping.
#

# Test Notifier
test-notify.txt: slice0000.tif slice0050.tif slice0100.tif slice0200.tif slice0300.tif slice0400.tif slice0500.tif slice0600.tif slice0700.tif slice0800.tif slice0900.tif slice1000.tif slice1300.tif
	touch test-notify.txt

# Raster slicing
#     At this point, we have one large .e00 image of the landscape.
#     We need to use GDAL's gdal_calc module to create individual
#     raster "slices" of the terrain.
#
#     This will look like a lot of repetition, and that's because it is.
#     We want to calculate and make each of these independently for maximum control.
slice0000.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0000.tif --calc="1*(A>0)" --NoDataValue=0
slice0050.tif: msdis_mo_dem_60m.e00
	gdal_calc.py -A msdis_mo_dem_60m.e00 --outfile=slice0050.tif --calc="50*(A>50)" --NoDataValue=0
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