import BreadCrumb from '../../../../Components/Common/BreadCrumb'
import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Sidepanel from './Sidepanel'
import MainList from './MainList'
import Layout from '../../../../Layouts'

const BlogListView = () => {

    document.title="List View | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="List View" pageTitle="Blogs" />
                    <Row>

                        <Sidepanel />

                        <MainList />

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

BlogListView.layout = (page:any) => <Layout children={page} />
export default BlogListView