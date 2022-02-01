import json
import numpy as np
import math

cars = [i for i in json.loads(open('carData.json','r').read())]

# # Price on y
# # Odometer on x
# odometers = np.array([i['odometer'] for i in cars])
# prices = np.array([i['price'] for i in cars])

# m,b = np.polyfit(odometers,prices,1)
# print(m*odometers[0] + b)


# x = [i['odometer'] for i in cars]
# y = [i['price'] for i in cars]

# x_mean = sum(x)/len(x)
# y_mean = sum(y)/len(y)

# sum1 = 0
# sum2 = 0

# for point_x,point_y in zip(x,y):
# 	sum1 += (point_x-x_mean)*(point_y-y_mean)
# 	sum2+= (point_x-x_mean)**2

# print(m,b)
# m = sum1/sum2
# b = y_mean - m*x_mean

# print(m,b)

x = [i['odometer']for i in cars]
log_x = [math.log(i) for i in x]

y = [i['price'] for i in cars]

x_mean = sum(log_x)/len(log_x)
y_mean = sum(y)/len(y)

sum1 = 0
sum2 = 0

for point_x,point_y in zip(log_x,y):
	sum1 += (point_x-x_mean)*(point_y-y_mean)
	sum2+= (point_x-x_mean)**2

m = sum1/sum2
b = y_mean - m*x_mean
print(m,b)

val = 73679
print(m*math.log(val)+b)

for i in y:
	print(i)