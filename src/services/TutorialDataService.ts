import http from "@/http-common";

class TutorialDataService {
  getAll() {
    return http.get( "/cars" );
  }

  get( id : string ) {
    return http.get( `/car/${ id }` );
  }

  create( data : any ) {
    return http.post( "/car", data );
  }

  update( data : any ) {
    return http.put( `/car`, data );
  }

  delete( id : any ) {
    return http.delete( `/car/${ id }` );
  }

  deleteAll() {
    return http.delete( `/tutorials` );
  }

  findByTitle( title : string ) {
    return http.get( `/tutorials?title=${ title }` );
  }
}

export default new TutorialDataService();
