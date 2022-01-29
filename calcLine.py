import json
import numpy as np

cars = [i for i in json.loads(open('carData.json','r').read())]

# # Price on y
# # Odometer on x
odometers = np.array([i['odometer'] for i in cars])
prices = np.array([i['price'] for i in cars])

m,b = np.polyfit(odometers,prices,1)
print(m*odometers[0] + b)


x = [i['odometer'] for i in cars]
y = [i['price'] for i in cars]

x_mean = sum(x)/len(x)
y_mean = sum(y)/len(y)

sum1 = 0
sum2 = 0

for point_x,point_y in zip(x,y):
	sum1 += (point_x-x_mean)*(point_y-y_mean)
	sum2+= (point_x-x_mean)**2

print(m,b)
m = sum1/sum2
b = y_mean - m*x_mean

print(m,b)

320000 10800
198599 10500
153507 11500
150000 11000
136000 11450
108000 18000
105851 14500
82827 28995
81178 16999
77490 23990
75895 16990
73679 19900
70300 18799
66852 24990
55790 21000
54000 25990
48565 21800
30000 22800
15000 41500
12979 25880
11887 39900
6000 45800
6000 47990
5455 44888
5200 46995
4999 47500
4257 40880
2235 47950
1999 53888
