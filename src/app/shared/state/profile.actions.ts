import { createAction, props } from "@ngrx/store";
import { PaginationResponse, Review, UserProfile } from "../models";


export const profileDataFetchedSuccess = createAction(
    "[Profile] profile data fetched succesfully ",
    props<{data : UserProfile}>() 
)

export const fetchProfileData = createAction(
    "[Profile] Fetch profile data ",
    props<{id : number}>()
)

export const updateProfile = createAction(
    "[Profile] Update profile" ,
    props<{data : FormData}>()
)

export const fetchReviewsData = createAction(
    "[Profile] fetch profile data !" ,
    props<{id : number , page : number}>()
)


export const ReviewsDataFetchedSuccessfully = createAction(
    "[Profile] Reviews Data Fetched Succesfully !",
    props<{data : PaginationResponse< Review []>}>()
)


