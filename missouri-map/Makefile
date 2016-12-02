#
# Makefile for Missouri terrain map data
# Nathan Lawrence, December 2016
#
# Dependencies: curl, gunzip (>1.6), gdal, topojson-client
#
# Note: Since these compressed files are not always updated, you MUST touch each one in the routine.

msdis_mo_dem_60m.e00: msdis_mo_dem_60m.e00.gz
	gunzip -k msdis_mo_dem_60m.e00.gz

msdis_mo_dem_60m.e00.gz:
	curl -o msdis_mo_dem_60m.e00.gz 'ftp://msdis.missouri.edu/pub/state/st_dem.e00.gz'