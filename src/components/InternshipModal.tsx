import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Descriptions, Alert, Card } from 'antd';

interface Props {
  id: string | null;
}

interface Internship {
  title: string;
  company: string;
  location: string;
  compensation: Compensation;
  student: Student;
  year: number;
  durationInWeeks: number;
}

interface Compensation {
  base: number;
  bonus: number;
  benefits: string;
}

interface Student {
  university: string;
  numOfInternships: number;
  classStanding: string;
}

interface InternshipData {
  internship: Internship;
}

interface InternshipVars {
  id: string;
}

const INTERNSHIP_MODAL_QUERY = gql`
  query getInternshipForModal($id: String!) {
    internship(id: $id) {
      title
      company
      location
      compensation {
        base
        bonus
        benefits
      }
      student {
        university
        numOfInternships
        classStanding
      }
      year
      durationInWeeks
    }
  }
`;

const InternshipModal: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery<InternshipData, InternshipVars>(INTERNSHIP_MODAL_QUERY, {
    variables: { id: id ? id : '' },
  });

  if (loading) {
    return (
      <div>
        <Descriptions title="General Info" size="small"></Descriptions>
        <Card loading={loading}></Card>
        <br />
        <br />
        <Descriptions title="Compensation" size="small"></Descriptions>
        <Card loading={loading}></Card>
        <br />
        <br />
        <Descriptions title="Student Info" size="small"></Descriptions>
        <Card loading={loading}></Card>
      </div>
    );
  }
  if (error) {
    return (
      <div className="page-content-error">
        <Alert message="Internship API Query failed" type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <Descriptions title="General Info" size="small" bordered>
        <Descriptions.Item label="Title">{data && data.internship.title}</Descriptions.Item>
        <Descriptions.Item label="Company" span={2}>
          {data && data.internship.company}
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={4}>
          {data && data.internship.location ? data.internship.location : 'Unknown'}
        </Descriptions.Item>
        <Descriptions.Item label="Year">{data && data.internship.year}</Descriptions.Item>
        <Descriptions.Item label="Length in weeks">{data && data.internship.durationInWeeks}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Compensation" size="small" bordered>
        <Descriptions.Item label="Hourly Pay">{data && data.internship.compensation.base / 160}</Descriptions.Item>
        <Descriptions.Item label="Monthly Salary" span={2}>
          {data && data.internship.compensation.base}
        </Descriptions.Item>
        <Descriptions.Item label="Monthly Housing Bonus" span={3}>
          {data && data.internship.compensation.bonus}
        </Descriptions.Item>
        <Descriptions.Item label="Additional Benefits" span={3}>
          {data && data.internship.compensation.benefits}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Student Info" size="small" bordered>
        <Descriptions.Item label="University">{data && data.internship.student.university}</Descriptions.Item>
        <Descriptions.Item label="Class Standing" span={2}>
          {data && data.internship.student.classStanding}
        </Descriptions.Item>
        <Descriptions.Item label="Prior Internships" span={3}>
          {data && data.internship.student.numOfInternships}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default InternshipModal;
