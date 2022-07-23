from csv import writer

age, gender, meals_day, physical_illness, screen_time, bluelight_filter, exercise, smoke_drink, beverage, sleep_time = [
    float(x) for x in input("Values: ").split()]
print(age, gender, meals_day, physical_illness, screen_time,
      bluelight_filter, exercise, smoke_drink, beverage)
xxx = (-0.00830112 * age) - (0.49082045 * gender) - (0.62780885 * meals_day) - (0.34457521 * physical_illness) + (0.03513663 * screen_time) + (0.60919839 *
                                                                                                                                               bluelight_filter) - (0.13535191 * exercise) - (0.51921082 * smoke_drink) + (1.88665327 * beverage) - (2.44908309 * sleep_time) + 34.141017319862776
print(xxx)
