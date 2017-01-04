import { Semgraph } from './semgraph';
export const SEMGRAPHS: Semgraph[] = [
  {Guid: 'semgraph11', SubjectGuid: 'project11', PredicateGuid: 'InstanceOf', ObjectGuid: 'project'},
  {Guid: 'semgraph12', SubjectGuid: 'contact11', PredicateGuid: 'InstanceOf', ObjectGuid: 'contact'},
  {Guid: 'semgraph13', SubjectGuid: 'company11', PredicateGuid: 'InstanceOf', ObjectGuid: 'company'},
  {Guid: 'semgraph14', SubjectGuid: 'company12', PredicateGuid: 'InstanceOf', ObjectGuid: 'company'},
  {Guid: 'semgraph15', SubjectGuid: 'contact11', PredicateGuid: 'DeveloperFor', ObjectGuid: 'project11'},
  {Guid: 'semgraph16', SubjectGuid: 'contact12', PredicateGuid: 'DeveloperFor', ObjectGuid: 'project11'},
  {Guid: 'semgraph17', SubjectGuid: 'company11', PredicateGuid: 'SupplierFor', ObjectGuid: 'project11'},
  {Guid: 'semgraph18', SubjectGuid: 'company12', PredicateGuid: 'CustomerFor', ObjectGuid: 'project11'},
  {Guid: 'semgraph19', SubjectGuid: 'contact11', PredicateGuid: 'EmployedBy', ObjectGuid: 'company11'},
  {Guid: 'semgraph20', SubjectGuid: 'contact12', PredicateGuid: 'EmployedBy', ObjectGuid: 'company13'},
  {Guid: 'semgraph21', SubjectGuid: 'contact12', PredicateGuid: 'OnBehalfOf', ObjectGuid: 'company12', ParentGuid: 'semgraph16'},
  {Guid: 'semgraph22', SubjectGuid: 'EmployedBy', PredicateGuid: 'AllowsObjectClass', ObjectGuid: 'company'},
  {Guid: 'semgraph23', SubjectGuid: 'EmployedBy', PredicateGuid: 'AllowsSubjectClass', ObjectGuid: 'contact'},
  {Guid: 'semgraph24', SubjectGuid: 'employee', PredicateGuid: 'IsSubClassOf', ObjectGuid: 'contact'},
  {Guid: 'semgraph25', SubjectGuid: 'english', PredicateGuid: 'InstanceOf', ObjectGuid: 'language'},
  {Guid: 'semgraph26', SubjectGuid: 'nederlands', PredicateGuid: 'InstanceOf', ObjectGuid: 'language'},
  {Guid: 'semgraph27', SubjectGuid: 'company', PredicateGuid: 'semgraph25', ObjectGuid: 'company'},
  {Guid: 'semgraph28', SubjectGuid: 'bedrijf', PredicateGuid: 'semgraph26', ObjectGuid: 'company'},

];