import { Category, CategoryConfiguration, CategoryServiceFactory, LogLevel } from "typescript-logging";
 
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info))

export const platform = new Category("Platform")
export const query = new Category("Query")
export const mutation = new Category("Mutation")
export const response = new Category("Response")
export const unknown = new Category("Unknown")
 