import { Semgraph } from './semgraph';
export const SEMGRAPHS: Semgraph[] = [
  {Guid: 'semgraph11', SubjectGuid: 'project11', PredicateGuid: 'InstanceOf', ObjectGuid: 'project'},
  {Guid: 'semgraph12', SubjectGuid: 'contact11', PredicateGuid: 'InstanceOf', ObjectGuid: 'contact'},
  {Guid: 'semgraph13', SubjectGuid: 'company11', PredicateGuid: 'InstanceOf', ObjectGuid: 'company'},
  {Guid: 'semgraph14', SubjectGuid: 'company12', PredicateGuid: 'InstanceOf', ObjectGuid: 'company'},
  {Guid: 'semgraph15', SubjectGuid: 'contact11', PredicateGuid: 'Developer', ObjectGuid: 'project11'},
  {Guid: 'semgraph16', SubjectGuid: 'contact12', PredicateGuid: 'Developer', ObjectGuid: 'project11'},
  {Guid: 'semgraph17', SubjectGuid: 'company11', PredicateGuid: 'Supplier', ObjectGuid: 'project11'},
  {Guid: 'semgraph18', SubjectGuid: 'company12', PredicateGuid: 'Customer', ObjectGuid: 'project11'},
  {Guid: 'semgraph22', SubjectGuid: 'EmployedBy', PredicateGuid: 'AllowsObjectClass', ObjectGuid: 'company'},
  {Guid: 'semgraph23', SubjectGuid: 'EmployedBy', PredicateGuid: 'AllowsSubjectClass', ObjectGuid: 'contact'},
  {Guid: 'semgraph19', SubjectGuid: 'contact11', PredicateGuid: 'EmployedBy', ObjectGuid: 'company11'},
  {Guid: 'semgraph20', SubjectGuid: 'contact12', PredicateGuid: 'EmployedBy', ObjectGuid: 'company13'},
  {Guid: 'semgraph21', SubjectGuid: 'contact12', PredicateGuid: 'ContractedTo', ObjectGuid: 'company12', ParentGuid: 'semgraph16'},
  {Guid: 'semgraph24', SubjectGuid: 'employee', PredicateGuid: 'SubClassOf', ObjectGuid: 'contact'},
  {Guid: 'semgraph25', SubjectGuid: 'english', PredicateGuid: 'InstanceOf', ObjectGuid: 'language'},
  {Guid: 'semgraph26', SubjectGuid: 'nederlands', PredicateGuid: 'InstanceOf', ObjectGuid: 'language'},
  {Guid: 'semgraph27', SubjectGuid: 'company', PredicateGuid: 'semgraph25', ObjectGuid: 'company'},
  {Guid: 'semgraph28', SubjectGuid: 'bedrijf', PredicateGuid: 'semgraph26', ObjectGuid: 'company'},
  {Guid: 'semgraph29', SubjectGuid: 'company', PredicateGuid: 'SubClassOf', ObjectGuid: 'object'},
  {Guid: 'semgraph30', SubjectGuid: 'Name', PredicateGuid: 'Property', ObjectGuid: 'object'},
  {Guid: 'semgraph31', SubjectGuid: 'Arwin van Arum', PredicateGuid: 'semgraph30', ObjectGuid: 'contact11'}

];